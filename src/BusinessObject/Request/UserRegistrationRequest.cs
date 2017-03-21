using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Request
{
    public class UserRegistrationRequest
    {
        public string Username;

        /// <summary>
        /// Hashed password by SHA256
        /// </summary>
        public string Password;

        public string Name;
    }
}
