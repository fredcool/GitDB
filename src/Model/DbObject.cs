using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DbObject
    {
        public const string Type_Function = "FN";
        public const string Type_Stored_Procedure = "P";

        #region SQL Script
        public string ScriptGetDbObjectsByType
        {
            get
            {
                return " SELECT OBJECT_SCHEMA_NAME(m.[object_id]) AS [SchemaName], "
                    + "   o.[name], "
                    + "   o.[type], "
                    + "   o.type_desc, "
                    + "   m.[definition] "
                    + " FROM sys.sql_modules m "
                    + " INNER JOIN sys.objects o ON m.object_id = o.object_id "
                    + " where o.[type] = @Type ";
            }
            set { }
        }
        #endregion

        public string SchemeName { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Type_Desc { get; set; }
        public string Definition { get; set; }
    }
}
