using BusinessObject.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Request
{
    public class CreateProjectRequest
    {
        public CreateProjectRequest()
        {
            this.project = new ProjectDomain();
        }
        public ProjectDomain project;
    }
}
