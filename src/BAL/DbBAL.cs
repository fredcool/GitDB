using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
using BusinessObject.Helper;
using BusinessObject.Request;
using BusinessObject.Response;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class DbBAL : IDbBAL
    {
        public string ProjectBasePath;

        public DbBAL()
        {
            this.ProjectBasePath = ConfigurationManager.AppSettings["RepoBasePath"];
        }

        public ListAllTablesResponse ListAllTables(ListAllTablesRequest request)
        {
            ListAllTablesResponse response = new ListAllTablesResponse();
            
            string projectPath = ProjectBasePath + request.ProjectName;

            if (Directory.Exists(projectPath))
            {
                // Get connection string from Project's _Db.config file
                ProjectDomain projectDomain = ProjectDomainHelper.ToProjectDomain(File.ReadAllText(projectPath + "\\_Db.config"));

                TableDAL tableDAL = new TableDAL(ProjectDomainHelper.ToConnectionString(projectDomain));
                List<Table> tables = tableDAL.GetTables();
                response.Tables = new List<CommitItemDomain>();
                foreach (Table table in tables)
                {
                    CommitItemDomain item = new CommitItemDomain();
                    item.ItemType = CommitItemDomain.ItemType_Table;
                    item.Name = table.TABLE_NAME;
                    response.Tables.Add(item);
                }
            }
            else
            {
                response.StatusCode = StatusCodes.Status_Error;
                response.StatusMessage = "Project not exists";
            }

            return response;
        }
    }
}
