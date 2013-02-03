using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using FlowerPower.Models;

namespace FlowerPower.Controllers
{
    public class FlowersController : ApiController
    {
        private FlowerContext db = new FlowerContext();

        // GET api/Flowers
        public IEnumerable<Flower> GetFlowers()
        {
            return db.Flowers.AsEnumerable();
        }

        // GET api/Flowers/5
        public Flower GetFlower(int id)
        {
            Flower flower = db.Flowers.Find(id);
            if (flower == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return flower;
        }

        // PUT api/Flowers/5
        public HttpResponseMessage PutFlower(int id, Flower flower)
        {
            if ( id == flower.Id)
            {
                db.Entry(flower).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Flowers
        public HttpResponseMessage PostFlower(Flower flower)
        {

            try
            {
                db.Flowers.Add(flower);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, flower);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = flower.Id }));
                return response;
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
        }

        // DELETE api/Flowers/5
        public HttpResponseMessage DeleteFlower(int id)
        {
            Flower flower = db.Flowers.Find(id);
            if (flower == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Flowers.Remove(flower);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, flower);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}