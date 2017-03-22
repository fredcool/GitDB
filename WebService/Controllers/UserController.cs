using BAL;
using BusinessObject.Request;
using BusinessObject.Response;
using DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebService.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// User/UserLogin
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserLogin(string Username, string Password)
        {
            UserLoginRequest request = new UserLoginRequest();
            request.Username = Username;
            request.Password = new UserDAL().GetStringSha256Hash(Password);
            IUserBAL userBAL = new UserBAL();
            UserLoginResponse response = userBAL.UserLogin(request);
            return Json(response);
        }

        /// <summary>
        /// User/UserRegistration
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="Password"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserRegistration(string Username, string Password, string Name)
        {
            UserRegistrationRequest request = new UserRegistrationRequest();
            request.Username = Username;
            request.Password = new UserDAL().GetStringSha256Hash(Password);
            request.Name = Name;
            IUserBAL userBAL = new UserBAL();
            UserRegistrationResponse response = userBAL.UserRegistration(request);
            return Json(response);
        }
    }
}