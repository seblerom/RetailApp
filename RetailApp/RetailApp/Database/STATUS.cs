//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RetailApp.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class STATUS
    {
        public STATUS()
        {
            this.USER = new HashSet<USER>();
        }
    
        public int Status1 { get; set; }
        public string Descripcion { get; set; }
    
        public virtual ICollection<USER> USER { get; set; }
    }
}