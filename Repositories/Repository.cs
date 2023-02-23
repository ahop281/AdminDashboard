using AdminDashboard.Contexts;
using AdminDashboard.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly AppDBContext _appDBContext;
        private readonly DbSet<T> _dbSet;

        public Repository(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
            _dbSet = _appDBContext.Set<T>();
        }

        public async Task<T> Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _appDBContext.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> GetAll()
        {
            var result = await _dbSet.AsNoTracking().ToListAsync();
            result.Reverse();
            return result;
        }

        public async Task<T?> GetByAttribute(string dbName, string name, string value)
        {
            return await _dbSet.FromSqlRaw($"SELECT * FROM[AdminDashboard].[dbo].[{dbName}] WHERE {name}='{value}'").FirstOrDefaultAsync();
        }

        public async Task<T?> GetById(int id)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<T> Remove(T entity)
        {
            _dbSet.Remove(entity);
            await _appDBContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            _dbSet.Update(entity);
            await _appDBContext.SaveChangesAsync();
            return entity;
        }
    }
}
