using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusinessObject.Helper;
using BusinessObject.BusinessObjects;

namespace UnitTest.BusinessHelper.Helper
{
    [TestClass]
    public class ProjectDomainHelperTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            ProjectDomain src = new ProjectDomain();
            src.Host = "10.10.10.10";
            src.Username = "Admin";
            src.Password = "Admin";
            src.Database = "MyDB";
            string actual = ProjectDomainHelper.ToFileContent(src);
            Assert.AreEqual("", actual);
        }
    }
}
