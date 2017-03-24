using BAL;
using BusinessObject.BusinessObjects;
using BusinessObject.Request;
using BusinessObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebService.Controllers
{
    public class ProjectController : Controller
    {
        // GET: Project
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Project/CreateProject
        /// </summary>
        /// <param name="ProjectName"></param>
        /// <param name="DbConnectionString"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CreateProject(string ProjectName, string Host, string Username, string Password, string Database)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            CreateProjectRequest request = new CreateProjectRequest();
            request.project.ProjectName = ProjectName;
            request.project.Host = Host;
            request.project.Username = Username;
            request.project.Password = Password;
            request.project.Database = Database;
            var response = projectBAL.CreateProject(request);
            return Json(response);
        }

        /// <summary>
        /// Project/GetAllProjects
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetAllProjects()
        {
            IProjectBAL projectBAL = new ProjectBAL();
            GetAllProjectsRequest request = new GetAllProjectsRequest();
            var response = projectBAL.GetAllProjects(request);
            return Json(response);
        }

        /// <summary>
        /// Project/ListItemsByProject
        /// </summary>
        /// <param name="ProjectName"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ListItemsByProject(string ProjectName)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            ListItemsByProjectRequest request = new ListItemsByProjectRequest();
            request.ProjectName = ProjectName;
            ListItemsByProjectResponse response = projectBAL.ListItemsByProject(request);
            return Json(response);
        }

        /// <summary>
        /// Project/CommitItem
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CommitItem(string ProjectName, string CommitMessage, string ItemType, string Name, string CurrentDefinition)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            CommitItemRequest request = new CommitItemRequest();
            request.CommitItems = new List<CommitItemDomain>();
            request.ProjectName = ProjectName;
            request.CommitMessage = CommitMessage;
            CommitItemDomain item = new CommitItemDomain();
            item.ItemType = ItemType;
            item.Name = Name;
            item.CurrentDefinition = CurrentDefinition;
            request.CommitItems.Add(item);
            if (!string.IsNullOrWhiteSpace(request.ProjectName) && request.CommitItems.Count > 0)
            {
                CommitItemRequestResponse response = projectBAL.CommitItem(request);
                return Json(response);
            }
            return Json(new { });
        }

        /// <summary>
        /// Project/CommitItems
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CommitItems(CommitItemRequest request)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            if (!string.IsNullOrWhiteSpace(request.ProjectName) && request.CommitItems.Count > 0)
            {
                CommitItemRequestResponse response = projectBAL.CommitItem(request);
                return Json(response);
            }
            return Json(new { });
        }

        /// <summary>
        /// Project/ProjectLog
        /// </summary>
        /// <param name="ProjectName"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ProjectLog(string ProjectName)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            ProjectLogRequest request = new ProjectLogRequest();
            request.ProjectName = ProjectName;
            ProjectLogResponse response = projectBAL.ProjectLog(request);
            return Json(response);
        }
    }
}