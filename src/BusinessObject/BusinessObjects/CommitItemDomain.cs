using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.BusinessObjects
{
    public class CommitItemDomain
    {
        public const string ItemType_Table = "TABLE";
        public const string ItemType_Function = "FUNCTION";
        public const string ItemType_Stored_Procedure = "SP";

        public string ItemType;
        public string Name;

        /// <summary>
        /// Script
        /// </summary>
        public string Definition;

        public string Diff;
    }
}
