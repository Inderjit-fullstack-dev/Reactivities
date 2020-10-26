using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{ 
    public class ActivitiesController : BaseController
    { 
        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> Details(Guid id) 
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
        [Authorize(Policy = "IsActivityHost")]
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
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        { 
            return await Mediator.Send(new Delete.Command() { Id = id });
        } 

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        { 
            return await Mediator.Send(new Attend.Command() { Id = id });
        } 
        
        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> UnAttend(Guid id)
        { 
            return await Mediator.Send(new Unattend.Command() { Id = id });
        } 
    }
}