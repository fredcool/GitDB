using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BAL;
using BusinessObject.Request;
using DAL;
using BusinessObject.Response;
using BusinessObject.Dictionary;

namespace UnitTest.BAL
{
    [TestClass]
    public class UserBALTest
    {
        private IUserBAL bal;

        [TestInitialize]
        public void setup()
        {
            bal = new UserBAL();
        }
        
        [TestMethod]
        public void TestUserLogin()
        {
            UserLoginRequest request = new UserLoginRequest();
            request.Username = "s932344@gmail.com";
            request.Password = new UserDAL().GetStringSha256Hash("Password1");
            UserLoginResponse actual = bal.UserLogin(request);
            Assert.AreEqual(actual.StatusCode, StatusCodes.Status_Success);
        }

        [TestMethod]
        public void TestUserRegistration()
        {
            UserRegistrationRequest request = new UserRegistrationRequest();
            request.Username = "Test300@gmail.com";
            request.Password = new UserDAL().GetStringSha256Hash("12345");
            request.Name = "Test 300";
            UserRegistrationResponse actual = bal.UserRegistration(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);
        }
    }
}
