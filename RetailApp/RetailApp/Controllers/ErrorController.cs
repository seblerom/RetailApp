﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RetailApp.Controllers
{
    [HandleError]
    public class ErrorController : Controller
    {
        //
        // GET: /Error/

        public ActionResult Index()
        {
            return View("Error");
        }

        public ActionResult Error404() 
        {
            return View();
        }

        public ActionResult Error500()
        {
            return View();
        }

    }
}
