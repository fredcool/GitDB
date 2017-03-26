using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BAL;
using BusinessObject.Request;
using BusinessObject.Response;
using BusinessObject.Dictionary;
using BusinessObject.BusinessObjects;

namespace UnitTest.BAL
{
    [TestClass]
    public class ProjectBALTest
    {
        IProjectBAL bal;

        [TestInitialize]
        public void setup()
        {
            bal = new ProjectBAL();
        }

        [TestMethod]
        public void TestCreateProject()
        {
            CreateProjectRequest request = new CreateProjectRequest();
            request.project.ProjectName = "Test";
            request.project.Host = "10.10.10.10";
            request.project.Username = "Admin";
            request.project.Password = "Admin";
            request.project.Database = "MyDB";
            CreateProjectResponse actual = bal.CreateProject(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);           
        }

        [TestMethod]
        public void TestCreateProject_Test2()
        {
            CreateProjectRequest request = new CreateProjectRequest();
            request.project.ProjectName = "Test2";
            request.project.Host = "10.10.10.10";
            request.project.Username = "Admin";
            request.project.Password = "Admin";
            request.project.Database = "MyDB";
            CreateProjectResponse actual = bal.CreateProject(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);
        }

        [TestMethod]
        public void TestGetAllProjects()
        {
            GetAllProjectsRequest request = new GetAllProjectsRequest();
            GetAllProjectsResponse response = bal.GetAllProjects(request);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Projects.Count > 0);
            Assert.AreEqual(StatusCodes.Status_Success, response.StatusCode);
        }

        [TestMethod]
        public void TestCommitItem()
        {
            CommitItemRequest request = new CommitItemRequest();
            request.ProjectName = "Test2";
            CommitItemDomain item1 = new CommitItemDomain();
            item1.ItemType = CommitItemDomain.ItemType_Table;
            item1.Name = "table1";
            request.CommitItems.Add(item1);

            CommitItemDomain item2 = new CommitItemDomain();
            item2.ItemType = CommitItemDomain.ItemType_Table;
            item2.Name = "table2";
            request.CommitItems.Add(item2);

            CommitItemRequestResponse response  = bal.CommitItem(request);
            Assert.AreEqual(StatusCodes.Status_Success, response.StatusCode);
        }

        [TestMethod]
        public void TestListItemsByProject()
        {
            ListItemsByProjectRequest request = new ListItemsByProjectRequest();
            request.ProjectName = "Test2";
            ListItemsByProjectResponse response = bal.ListItemsByProject(request);

            Assert.AreEqual(StatusCodes.Status_Success, response.StatusCode);
        }

        [TestMethod]
        public void TestListItemsByProject_Order()
        {
            ListItemsByProjectRequest request = new ListItemsByProjectRequest();
            request.ProjectName = "Order";
            ListItemsByProjectResponse response = bal.ListItemsByProject(request);

            Assert.AreEqual(StatusCodes.Status_Success, response.StatusCode);
        }

        [TestMethod]
        public void TestProjectLog()
        {
            ProjectLogRequest request = new ProjectLogRequest();
            request.ProjectName = "Test2";
            ProjectLogResponse actual = bal.ProjectLog(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);
        }

        [TestMethod]
        public void TestSend()
        {
            Common.SendEmail("s932344@gmail.com", "TestS", "TestB");
        }
    }
}
