using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
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

            string projectPath = ProjectBasePath + request.ProjectName;
            string result = null;

            if (!Directory.Exists(projectPath))
            {
                result = Repository.Init(projectPath);
                if (!string.IsNullOrWhiteSpace(result))
                {
                    Repository repo = new Repository(projectPath);
                    //Create README.md file
                    File.WriteAllText(projectPath + "\\README.md", request.ProjectName);

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

            List<string> projectNames = new List<string>();
            foreach(string projectPath in projectPaths)
            {
                projectNames.Add(projectPath.Replace(ProjectBasePath, ""));
            }

            response.ProjectNames = projectNames.ToList();
            return response;
        }

        public CommitItemRequestResponse CommitItem(CommitItemRequest request)
        {
            CommitItemRequestResponse response = new CommitItemRequestResponse();
            string projectPath = ProjectBasePath + request.ProjectName;
            Repository repo = new Repository(projectPath);
            string commitMessage = "";

            foreach (CommitItemObj commitItem in request.CommitItems)
            {
                string itemPath = projectPath + "\\" + commitItem.ItemType + "_" + commitItem.Name + ".txt";
                string content = "";
                //TODO if the ItemType is table, get the schema script
                if (commitItem.ItemType == CommitItemObj.ItemType_Table)
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

            if (itemPaths.Length > 0)
            {
                response.Items = new List<CommitItemObj>();
                foreach (string itemPath in itemPaths)
                {
                    string fileName = Path.GetFileName(itemPath);
                    string ItemName = Path.GetFileNameWithoutExtension(itemPath);
                    if (!this.exclusionFiles.Contains(fileName))
                    {
                        CommitItemObj commitItemObj = new CommitItemObj();
                        string[] fileSegs = ItemName.Split('_');
                        commitItemObj.ItemType = fileSegs[0].ToUpper();
                        commitItemObj.Name = fileSegs[1];
                        response.Items.Add(commitItemObj);
                    }
                }
            }

            return response;
        }
    }
}
