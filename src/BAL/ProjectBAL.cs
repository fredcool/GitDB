using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
using BusinessObject.Helper;
using BusinessObject.Request;
using BusinessObject.Response;
using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class ProjectBAL : IProjectBAL
    {
        public string ProjectBasePath;
        public List<string> exclusionFiles;
        public ProjectBAL()
        {
            this.ProjectBasePath = ConfigurationManager.AppSettings["RepoBasePath"];
            exclusionFiles = new List<string>();
            exclusionFiles.Add("README.md");
        }

        public CreateProjectResponse CreateProject(CreateProjectRequest request)
        {
            CreateProjectResponse response = new CreateProjectResponse();

            string projectPath = ProjectBasePath + request.project.ProjectName;
            string result = null;

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
                response.StatusCode = StatusCodes.Status_Error;
                response.StatusMessage = "Project already exists";
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
            string commitMessage = "";

            foreach (CommitItemDomain commitItem in request.CommitItems)
            {
                string itemPath = projectPath + "\\" + commitItem.ItemType + "_" + commitItem.Name + ".txt";
                string content = "";
                //TODO if the ItemType is table, get the schema script
                if (commitItem.ItemType == CommitItemDomain.ItemType_Table)
                {

                }

                commitMessage += "Commit " + commitItem.ItemType + ": " +commitItem.Name + "\n";
                File.WriteAllText(itemPath, content);
            }
            Commands.Stage(repo, "*");

            // Create the committer's signature and commit
            Signature author = new Signature(Properties.AuthorName, Properties.AuthorEmail, DateTime.Now);
            Signature committer = new Signature(Properties.CommitterName, Properties.CommitterEmail, DateTime.Now);

            repo.Commit(commitMessage, author, committer);

            return response;
        }

        public ListItemsByProjectResponse ListItemsByProject(ListItemsByProjectRequest request)
        {
            ListItemsByProjectResponse response = new ListItemsByProjectResponse();
            string projectPath = ProjectBasePath + request.ProjectName;

            string[] itemPaths = Directory.GetFiles(projectPath);
            //TODO Get all tables

            if (itemPaths.Length > 0)
            {
                response.TableItems = new List<CommitItemDomain>();
                foreach (string itemPath in itemPaths)
                {
                    string fileName = Path.GetFileName(itemPath);
                    string ItemName = Path.GetFileNameWithoutExtension(itemPath);
                    if (!this.exclusionFiles.Contains(fileName))
                    {
                        CommitItemDomain commitItemObj = new CommitItemDomain();
                        string[] fileSegs = ItemName.Split('_');
                        commitItemObj.ItemType = fileSegs[0].ToUpper();
                        commitItemObj.Name = fileSegs[1];
                        response.TableItems.Add(commitItemObj);
                    }
                }
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
    }
}
