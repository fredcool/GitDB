﻿using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class ListItemsByProjectResponse : Status
    {
        public ListItemsByProjectResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
        }

        public List<CommitItemDomain> TableItems;

        public List<CommitItemDomain> StoredProcedureItems;

        public List<CommitItemDomain> FunctionItems;
    }
}
