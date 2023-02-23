using AdminDashboard.Models;

namespace AdminDashboard.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> GetByAttribute(string dbName, string name, string value);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Remove(T entity);
    }
}
