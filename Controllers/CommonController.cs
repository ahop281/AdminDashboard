using AdminDashboard.Models;
using AdminDashboard.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommonController : ControllerBase
    {
        private readonly IRepository<Order> orderRepository;
        private readonly IRepository<Product> productRepository;
        private readonly IRepository<Customer> customerRepository;
        private readonly IRepository<Supplier> supplierRepository;

        public CommonController(
            IRepository<Order> orderRepository,
            IRepository<Product> productRepository,
            IRepository<Customer> customerRepository,
            IRepository<Supplier> supplierRepository)
        {
            this.orderRepository = orderRepository;
            this.productRepository = productRepository;
            this.customerRepository = customerRepository;
            this.supplierRepository = supplierRepository;
        }

        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var result = await orderRepository.GetAll();
                return Ok(result);
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var result = await productRepository.GetAll();
                return Ok(result);
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetCustomers")]
        public async Task<IActionResult> GetCustomers()
        {
            try
            {
                var result = await customerRepository.GetAll();
                return Ok(result);
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetSuppliers")]
        public async Task<IActionResult> GetSuppliers()
        {
            try
            {
                var result = await supplierRepository.GetAll();
                return Ok(result);
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
