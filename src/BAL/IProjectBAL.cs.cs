using BusinessObject.Request;
using BusinessObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public interface IProjectBAL
    {
        GetAllProjectsResponse GetAllProjects(GetAllProjectsRequest request);

        CreateProjectResponse CreateProject(CreateProjectRequest request);

        CommitItemRequestResponse CommitItem(CommitItemRequest request);

        ListItemsByProjectResponse ListItemsByProject(ListItemsByProjectRequest request);
    }
}
