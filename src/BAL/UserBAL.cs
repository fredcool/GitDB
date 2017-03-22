using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Request;
using BusinessObject.Response;
using DAL;
using Model;
using BusinessObject.Dictionary;

namespace BAL
{
    public class UserBAL : IUserBAL
    {
        public UserLoginResponse UserLogin(UserLoginRequest request)
        {
            UserDAL userDAL = new UserDAL();
            UserLoginResponse response = new UserLoginResponse();
            User user = userDAL.GetUserByUsername(request.Username);

            if(user == null || user.Password != request.Password)
            {
                response.StatusCode = StatusCodes.Status_Login_Failed;
                response.StatusMessage = "Login failed";
            }
            else
            {
                response.StatusMessage = "Login successfully";
            }

            return response;
        }

        public UserRegistrationResponse UserRegistration(UserRegistrationRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
