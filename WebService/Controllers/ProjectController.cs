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

        [HttpPost]
        public ActionResult CreateProject(string ProjectName, string DbConnectionString)
        {
            IProjectBAL projectBAL = new ProjectBAL();
            CreateProjectRequest request = new CreateProjectRequest();
            request.ProjectName = ProjectName;
            request.DbConnectionString = DbConnectionString;
            CreateProjectResponse response = projectBAL.CreateProject(request);
            return Json(response);
        }
    }
}