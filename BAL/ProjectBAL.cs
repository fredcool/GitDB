using BusinessObject.Request;
using BusinessObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class ProjectBAL : IProjectBAL
    {
        public CreateProjectResponse CreateProject(CreateProjectRequest request)
        {
            CreateProjectResponse response = new CreateProjectResponse();

            //TODO Create Repo

            return response;
        }
    }
}
