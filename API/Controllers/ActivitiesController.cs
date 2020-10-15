using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{ 
    public class ActivitiesController : BaseController
    { 
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) 
        {
            return await Mediator.Send(new Details.Query() { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            try 
            {
                return await Mediator.Send(command);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            try 
            {
                command.Id = id;
                return await Mediator.Send(command);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.StackTrace);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        { 
            return await Mediator.Send(new Delete.Command() { Id = id });
        } 
    }
}