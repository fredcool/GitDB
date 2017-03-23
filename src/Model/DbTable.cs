using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DbTable
    {
        public string ScriptGetTables
        {
            get
            {
                return " SELECT * FROM INFORMATION_SCHEMA.TABLES ";
            }
            set { }
        }

        public string TABLE_CATALOG { get; set; }
        public string TABLE_SCHEMA { get; set; }
        public string TABLE_NAME { get; set; }
        public string TABLE_TYPE { get; set; }

        public string Definition { get; set; }
    }
}
