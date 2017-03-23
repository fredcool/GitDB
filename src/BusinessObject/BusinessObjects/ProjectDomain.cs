using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.BusinessObjects
{
    public class ProjectDomain
    {
        public string ProjectName;

        public string Host;
        public string Username;
        public string Password;
        public string Database;

        public override string ToString()
        {
            return "ProjectName: " + ProjectName
                + "; Host: " + Host
                + "; Username: " + Username
                + "; Password: " + Password
                + "; Database: " + Database;
        }
    }
}
