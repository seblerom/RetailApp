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
    
    public partial class PREGUNTA
    {
        public PREGUNTA()
        {
            this.RESPUESTA = new HashSet<RESPUESTA>();
        }
    
        public int Id { get; set; }
        public string Pregunta1 { get; set; }
    
        public virtual ICollection<RESPUESTA> RESPUESTA { get; set; }
    }
}