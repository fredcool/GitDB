using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
using BusinessObject.Helper;
using BusinessObject.Request;
using BusinessObject.Response;
using DAL;
using LibGit2Sharp;
using Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;

namespace BAL
{
    public class ProjectBAL : IProjectBAL
    {
        public string ProjectBasePath;
        public List<string> exclusionFiles;
        private LogDAL logDAL;
        public ProjectBAL()
        {
            this.ProjectBasePath = ConfigurationManager.AppSettings["RepoBasePath"];
            exclusionFiles = new List<string>();
            exclusionFiles.Add("README.md");
            exclusionFiles.Add("_Db.config");
            this.logDAL = new LogDAL();
        }

        public CreateProjectResponse CreateProject(CreateProjectRequest request)
        {
            CreateProjectResponse response = new CreateProjectResponse();
            LogDAL logDAL = new LogDAL();
            string projectPath = ProjectBasePath + request.project.ProjectName;
            string result = null;

            logDAL.InsertLog(request.project.ToString());
            logDAL.InsertLog(projectPath);

            try
            {
                if (!Directory.Exists(projectPath))
                {
                    result = Repository.Init(projectPath);
                    if (!string.IsNullOrWhiteSpace(result))
                    {
                        Repository repo = new Repository(projectPath);
                        //Create README.md file
                        File.WriteAllText(projectPath + "\\README.md", request.project.ProjectName);

                        //Create _Db.config file
                        File.WriteAllText(projectPath + "\\_Db.config", ProjectDomainHelper.ToFileContent(request.project));

                        //Git add
                        Commands.Stage(repo, "*");

                        // Create the committer's signature and commit
                        Signature author = new Signature(Properties.AuthorName, Properties.AuthorEmail, DateTime.Now);
                        Signature committer = new Signature(Properties.CommitterName, Properties.CommitterEmail, DateTime.Now);

                        repo.Commit("Project Initialization", author, committer);
                    }
                    else
                    {
                        response.StatusCode = StatusCodes.Status_Error;
                        response.StatusMessage = "Unable to create project";
                    }
                }
                else
                {
                    logDAL.InsertLog("Project already exists");
                    response.StatusCode = StatusCodes.Status_Error;
                    response.StatusMessage = "Project already exists";
                }
            }
            catch(Exception e)
            {
                logDAL.InsertLog(e.ToString());
            }

            response.Result = result;
            return response;
        }

        public GetAllProjectsResponse GetAllProjects(GetAllProjectsRequest request)
        {
            GetAllProjectsResponse response = new GetAllProjectsResponse();

            //TODO Get all folder name under BasePath
            string[] projectPaths = Directory.GetDirectories(ProjectBasePath);

            List<ProjectDomain> projects = new List<ProjectDomain>();
            foreach(string projectPath in projectPaths)
            {
                // Read _DBConfig
                ProjectDomain projectDomain = ProjectDomainHelper.ToProjectDomain(File.ReadAllText(projectPath+"\\_Db.config"));
                projectDomain.ProjectName = projectPath.Replace(ProjectBasePath, "");
                projects.Add(projectDomain);
            }

            response.Projects = projects.ToList();
            return response;
        }

        public CommitItemRequestResponse CommitItem(CommitItemRequest request)
        {
            CommitItemRequestResponse response = new CommitItemRequestResponse();
            string projectPath = ProjectBasePath + request.ProjectName;
            Repository repo = new Repository(projectPath);
            string commitMessage = !string.IsNullOrWhiteSpace(request.CommitMessage) ? request.CommitMessage + "\n" : "";
            string content = "";

            // Get connection string from Project's _Db.config file
            ProjectDomain projectDomain = ProjectDomainHelper.ToProjectDomain(File.ReadAllText(projectPath + "\\_Db.config"));

            foreach (CommitItemDomain commitItem in request.CommitItems)
            {
                string itemPath = projectPath + "\\" + commitItem.ItemType + "_" + commitItem.Name + ".txt";
                content = commitItem.CurrentDefinition;
                this.logDAL.InsertLog(commitItem.Name);
                // If the ItemType is table, get the schema script
                if (commitItem.ItemType == CommitItemDomain.ItemType_Table)
                {
                    logDAL.InsertLog("TABLE");
                    // Get all tables
                    IDbBAL dbBAL = new DbBAL();
                    ListAllTablesRequest listAllTablesRequest = new ListAllTablesRequest();
                    listAllTablesRequest.ProjectName = request.ProjectName;
                    ListAllTablesResponse listAllTables = dbBAL.ListAllTables(listAllTablesRequest);

                    foreach(CommitItemDomain table in listAllTables.Tables)
                    {
                        if(table.Name == commitItem.Name)
                        {
                            content = table.CurrentDefinition;
                            logDAL.InsertLog(content);
                        }
                    }
                }

                // Function
                DbObjectDAL dbObjectDAL = new DbObjectDAL(ProjectDomainHelper.ToConnectionString(projectDomain));
                if (commitItem.ItemType == CommitItemDomain.ItemType_Function)
                {
                    // Get Function
                    List<DbObject> functions = dbObjectDAL.GetDbObjectsByType(DbObject.Type_Function);

                    foreach(DbObject function in functions)
                    {
                        if(function.Name == commitItem.Name)
                        {
                            content = function.Definition;
                        }
                    }
                }

                // SP
                if (commitItem.ItemType == CommitItemDomain.ItemType_Stored_Procedure)
                {
                    // Get SP
                    List<DbObject> storedProcedures = dbObjectDAL.GetDbObjectsByType(DbObject.Type_Stored_Procedure);
                    foreach(DbObject sp in storedProcedures)
                    {
                        if(sp.Name == commitItem.Name)
                        {
                            content = sp.Definition;
                        }
                    }
                }

                this.logDAL.InsertLog(content);
                commitMessage += "Commit " + commitItem.ItemType + ": " +commitItem.Name + "\n";
                File.WriteAllText(itemPath, content);
            }
            Commands.Stage(repo, "*");

            // Create the committer's signature and commit
            Signature author = new Signature(Properties.AuthorName, Properties.AuthorEmail, DateTime.Now);
            Signature committer = new Signature(Properties.CommitterName, Properties.CommitterEmail, DateTime.Now);

            try
            {
                repo.Commit(commitMessage, author, committer);

                UserDAL userDAL = new UserDAL();
                List<User> users = userDAL.GetAllUsers();
                
                foreach (User user in users)
                {
                    Common.SendEmail(user.Username, request.ProjectName + " has new commit!", content);
                }
            }
            catch(Exception ex)
            {
                response.StatusCode = StatusCodes.Status_Error;
                response.StatusMessage = ex.ToString();
            }

            return response;
        }

        public ListItemsByProjectResponse ListItemsByProject(ListItemsByProjectRequest request)
        {
            ListItemsByProjectResponse response = new ListItemsByProjectResponse();
            string projectPath = ProjectBasePath + request.ProjectName;

            if (Directory.Exists(projectPath))
            {
                Repository repo = new Repository(projectPath);
                string[] itemPaths = Directory.GetFiles(projectPath);

                // Get connection string from Project's _Db.config file
                ProjectDomain projectDomain = ProjectDomainHelper.ToProjectDomain(File.ReadAllText(projectPath + "\\_Db.config"));

                // Get all tables
                IDbBAL dbBAL = new DbBAL();
                ListAllTablesRequest listAllTablesRequest = new ListAllTablesRequest();
                listAllTablesRequest.ProjectName = request.ProjectName;
                ListAllTablesResponse listAllTables = dbBAL.ListAllTables(listAllTablesRequest);

                if (listAllTables.Tables.Count > 0)
                {
                    response.TableItems = new List<CommitItemDomain>();
                    foreach (CommitItemDomain commitItem in listAllTables.Tables)
                    {
                        response.TableItems.Add(commitItem);
                        string itemPath = projectPath + "\\" + commitItem.GetCommitItemFileName();
                        if (File.Exists(itemPath))
                        {
                            //
                            commitItem.CommittedDefinition = File.ReadAllText(itemPath);

                            // Write create definition to the file
                            File.WriteAllText(itemPath, commitItem.CurrentDefinition + "\n");

                            // Get Diff
                            foreach(PatchEntryChanges c in repo.Diff.Compare<Patch>())
                            {
                                commitItem.Diff = c.Patch;
                            }

                            // Reset to the latest commit since we already got the difference.
                            repo.Reset(ResetMode.Hard);
                        }
                        else
                        {
                            commitItem.Diff = commitItem.CurrentDefinition;
                        }
                    }
                }

                DbObjectDAL dbObjectDAL = new DbObjectDAL(ProjectDomainHelper.ToConnectionString(projectDomain));
                // Get Function
                List<DbObject> functions = dbObjectDAL.GetDbObjectsByType(DbObject.Type_Function);

                if(functions != null && functions.Count > 0)
                {
                    response.FunctionItems = new List<CommitItemDomain>();
                    foreach(DbObject function in functions)
                    {
                        CommitItemDomain item = new CommitItemDomain();
                        item.ItemType = CommitItemDomain.ItemType_Function;
                        item.Name = function.Name;
                        item.CurrentDefinition = function.Definition;
                        response.FunctionItems.Add(item);
                    }

                    //TODO
                    foreach(CommitItemDomain commitItem in response.FunctionItems)
                    {
                        string itemPath = projectPath + "\\" + commitItem.GetCommitItemFileName();
                        if (File.Exists(itemPath))
                        {
                            commitItem.CommittedDefinition = File.ReadAllText(itemPath);

                            // Write create definition to the file
                            File.WriteAllText(itemPath, commitItem.CurrentDefinition + "\n");

                            // Get Diff
                            foreach (PatchEntryChanges c in repo.Diff.Compare<Patch>())
                            {
                                commitItem.Diff = c.Patch;
                            }

                            // Reset to the latest commit since we already got the difference.
                            repo.Reset(ResetMode.Hard);
                        }
                        else
                        {
                            commitItem.Diff = commitItem.CurrentDefinition;
                        }
                    }
                }

                // Get SP
                List<DbObject> storedProcedures = dbObjectDAL.GetDbObjectsByType(DbObject.Type_Stored_Procedure);
                if (storedProcedures != null && storedProcedures.Count > 0)
                {
                    response.StoredProcedureItems = new List<CommitItemDomain>();
                    foreach (DbObject storedProcedure in storedProcedures)
                    {
                        CommitItemDomain item = new CommitItemDomain();
                        item.ItemType = CommitItemDomain.ItemType_Stored_Procedure;
                        item.Name = storedProcedure.Name;
                        item.CurrentDefinition = storedProcedure.Definition;
                        response.StoredProcedureItems.Add(item);
                    }

                    //TODO
                    foreach (CommitItemDomain commitItem in response.StoredProcedureItems)
                    {
                        string itemPath = projectPath + "\\" + commitItem.GetCommitItemFileName();
                        if (File.Exists(itemPath))
                        {
                            commitItem.CommittedDefinition = File.ReadAllText(itemPath);

                            // Write create definition to the file
                            File.WriteAllText(itemPath, commitItem.CurrentDefinition + "\n");

                            // Get Diff
                            foreach (PatchEntryChanges c in repo.Diff.Compare<Patch>())
                            {
                                commitItem.Diff = c.Patch;
                            }

                            // Reset to the latest commit since we already got the difference.
                            repo.Reset(ResetMode.Hard);
                        }
                        else
                        {
                            commitItem.Diff = commitItem.CurrentDefinition;
                        }
                    }
                }
            }
            else
            {
                response.StatusCode = StatusCodes.Status_Error;
                response.StatusMessage = "Project not exists";
            }

            return response;
        }

        public DiffItemResponse DiffItem(DiffItemRequest request)
        {
            throw new NotImplementedException();
        }

        public GetProjectItemResponse GetProjectItem(GetProjectItemRequest request)
        {
            throw new NotImplementedException();
        }

        public ProjectLogResponse ProjectLog(ProjectLogRequest request)
        {
            ProjectLogResponse response = new ProjectLogResponse();
            string projectPath = ProjectBasePath + request.ProjectName;

            if (Directory.Exists(projectPath))
            {
                Repository repo = new Repository(projectPath);
                response.FullLog += "Project: " + request.ProjectName + "\n******************************************\n";
                foreach(Commit c in repo.Commits.ToList())
                {
                    CommitLogBo log = new CommitLogBo();
                    log.Id = c.Id.Sha;
                    log.Log = c.Message;
                    log.Author = c.Author.Name + "<" + c.Author.Email + ">";

                    response.logs.Add(log);
                    response.FullLog += "\nCommit: " + log.Id.Substring(0, 7) + " \nAuthor: " + log.Author + "\nMessage:\n" + log.Log + "\n========================";
                }
            }
            else
            {
                response.StatusCode = StatusCodes.Status_Error;
                response.StatusMessage = "Project not exists";
            }

            return response;
        }
    }
}
