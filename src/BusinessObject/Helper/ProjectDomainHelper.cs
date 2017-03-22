using BusinessObject.BusinessObjects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Helper
{
    public class ProjectDomainHelper
    {
        public static string ToConnectionString(ProjectDomain src)
        {
            string connectionString = "Data Source=" + src.Host + ";Initial Catalog=" + src.Host + ";Integrated Security=False;User Id=" + src.Username + ";Password=" + src.Password + ";MultipleActiveResultSets=True";
            return connectionString;
        }

        public static string ToFileContent(ProjectDomain src)
        {
            return JsonConvert.SerializeObject(src);
        }

        public static ProjectDomain ToProjectDomain(string src)
        {
            ProjectDomain domain = JsonConvert.DeserializeObject<ProjectDomain>(src);
            return domain;
        }
    }
}
