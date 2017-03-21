﻿using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class ListAllDbItemsResponse : Status
    {
        public ListAllDbItemsResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
        }
    }
}