using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;
using Model;
using System.Collections.Generic;

namespace UnitTest.DAL
{
    [TestClass]
    public class UserDALTest
    {
        private UserDAL dal;

        [TestInitialize]
        public void setup()
        {
            dal = new UserDAL();
        }

        [TestMethod]
        public void TestGetUserByUsername()
        {
            User actual = dal.GetUserByUsername("s932344@gmail.com");
            Assert.IsNotNull(actual);
        }

        [TestMethod]
        public void TestGetStringSha256Hash()
        {
            string actual = dal.GetStringSha256Hash("password1");
            Assert.AreEqual("0B14D501A594442A01C6859541BCB3E8164D183D32937B851835442F69D5C94E", actual);
        }

        [TestMethod]
        public void TestGetAllUsers()
        {
            List<User> actual = dal.GetAllUsers();
            Assert.IsNotNull(actual);
            Assert.IsTrue(actual.Count > 0);
        }
    }
}
