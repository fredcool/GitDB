﻿using BusinessObject.Request;
using BusinessObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public interface IUserBAL
    {
        UserLoginResponse UserLogin(UserLoginRequest request);

        UserRegistrationResponse UserRegistration(UserRegistrationRequest request);
    }
}
