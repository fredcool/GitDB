using BAL;
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
            CreateProjectResponse response = projectBAL.CreateProject(request);
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
    }
}