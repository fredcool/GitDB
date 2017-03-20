﻿using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class CreateProjectResponse : Status
    {
        public CreateProjectResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
        }

        public string Result;
    }
}
