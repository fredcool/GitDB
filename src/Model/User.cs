using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class User
    {
        #region SQL Scripts
        public string ScriptGetUserByUsername
        {
            get
            {
                return " select * from [User] where Username = @Username ";
            }
            set { }
        }
        public string ScriptInsert
        {
            get
            {
                return " insert into [User](Username, [Password], [Name], CreateDate, UpdateDate) "
                    + " values(@Username, @Password, @Name, getdate(), getdate()) ";
            }
            set { }
        }
        #endregion

        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
