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
        /// Script which commited
        /// </summary>
        public string CommittedDefinition;

        /// <summary>
        /// Current Script
        /// </summary>
        public string CurrentDefinition;

        public string Status;
        public string Diff;

        public string CommitMessage;

        public string GetCommitItemFileName()
        {
            return ItemType + "_" + Name + ".txt";
        }
    }
}
