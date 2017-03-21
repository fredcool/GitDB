﻿using BusinessObject.BusinessObjects;
using BusinessObject.Request;
using BusinessObject.Response;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class DbBAL : IDbBAL
    {
        public ListAllDbItemsResponse ListAllDbItems(ListAllDbItemsRequest request)
        {
            ListAllDbItemsResponse response = new ListAllDbItemsResponse();
            TableDAL tableDAL = new TableDAL();
            List<Table> tables = tableDAL.GetTablesByDatabase(request.DatabaseName);
            response.Tables = new List<CommitItemObj>();
            foreach(Table table in tables)
            {
                CommitItemObj item = new CommitItemObj();
                item.ItemType = CommitItemObj.ItemType_Table;
                item.Name = table.TABLE_NAME;
                response.Tables.Add(item);
            }

            return response;
        }
    }
}
