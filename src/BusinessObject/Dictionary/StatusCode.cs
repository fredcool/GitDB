﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Dictionary
{
    public class StatusCodes
    {
        public const int Status_Success = 0;

        public const int Status_Error = 1;

        public const int Status_Login_Failed = 1000;

        public const int Status_User_Exists = 1001;

        public const int Status_Register_Failed = 1002;
    }
}
