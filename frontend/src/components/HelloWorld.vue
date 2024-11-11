<template>
  <div class="hello">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to BooknBorrow</h1>
      <p>Your one-stop destination to borrow and explore books from various libraries.</p>
      <a href="#/books/list/all/" class="cta-button">Explore Books</a>
    </section>

    <!-- Table Links Section -->
    <h2>Discover Our Services</h2>
    <div class="card-container">
      <div class="card">
        <h3>Book List</h3>
        <p>Browse through a wide range of books available across multiple genres.</p>
        <a href="#/books/list/all/" class="card-link">View Books</a>
      </div>
      <div class="card">
        <h3>Libraries</h3>
        <p>Explore our network of libraries and find the one closest to you.</p>
        <a href="#/libraries/list/all" class="card-link">Find Libraries</a>
      </div>
      <div class="card">
        <h3>Reservations</h3>
        <p>Reserve your favorite books and enjoy seamless borrowing.</p>
        <a href="#/borrow/list/all" class="card-link">Manage Reservations</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
/* Hero Section */
.hero {
  background-image: url('https://images.unsplash.com/photo-1512820790803-83ca734da794');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 140px 20px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 3em;
}

.cta-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.cta-button:hover {
  background-color: #369d72;
}

/* Card Styles */
.card-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
}

.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.card h3 {
  margin-bottom: 0.5em;
  color: #42b983;
}

.card p {
  font-size: 1em;
  color: #555;
}

.card-link {
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  margin-top: 1em;
  transition: color 0.3s;
}

.card-link:hover {
  color: #369d72;
}

.card:hover {
  transform: translateY(-5px);
}

/* Footer */
h2 {
  text-align: center;
  margin-top: 40px;
  color: #333;
}
</style>
