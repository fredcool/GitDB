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
            request.ProjectName = "Test";
            CreateProjectResponse actual = bal.CreateProject(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);           
        }

        [TestMethod]
        public void TestCreateProject_Test2()
        {
            CreateProjectRequest request = new CreateProjectRequest();
            request.ProjectName = "Test2";
            CreateProjectResponse actual = bal.CreateProject(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);
        }

        [TestMethod]
        public void TestGetAllProjects()
        {
            GetAllProjectsRequest request = new GetAllProjectsRequest();
            GetAllProjectsResponse response = bal.GetAllProjects(request);
            Assert.AreEqual(StatusCodes.Status_Success, response.StatusCode);
        }

        [TestMethod]
        public void TestCommitItem()
        {
            CommitItemRequest request = new CommitItemRequest();
            request.ProjectName = "Test2";
            CommitItemObj item1 = new CommitItemObj();
            item1.ItemType = CommitItemObj.ItemType_Table;
            item1.Name = "table1";
            request.CommitItems.Add(item1);

            CommitItemObj item2 = new CommitItemObj();
            item2.ItemType = CommitItemObj.ItemType_Table;
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
    }
}
