import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;




// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// export const Fib = () => {
//   const [seenIndexes, setSeenIndexes] = useState([])
//   const [fiboValues, setFiboValues] = useState({})
//   const [index, setIndex] = useState('')

//   const fetchValues = async () => {
//     const values = await axios.get('/api/values/current')
//     setFiboValues({ fiboValues: values.data })
//   }

//   const fetchIndexes = async () => {
//     const prevIndexes = await axios.get('/api/values/all')
//     setSeenIndexes({ seenIndexes: prevIndexes.data })
//   }

//   useEffect(() => {
//     fetchValues()
//     fetchIndexes()
//   }, [])

//   const renderSeenIndexes = () => {
//     return seenIndexes.map(({ number }) => number).join(', ')
//   }

//   const renderValues = () => {
//     const entries = [] 
//     console.log(fiboValues)
//     console.log(seenIndexes)
//     for (let key in fiboValues) {
//       entries.push(
//         <div key={key}>
//           For index {key} I calculated 
//         </div>
//       )
//     }

//     return entries
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     await axios.post('/api/values', { index })

//     setIndex('')
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="">Enter your index</label>
//         <input type="text"
//           value={index}
//           onChange={event => setIndex(event.target.value)}
//         />
//         <button>Submit</button>
//       </form>
//       <h3>Indexes I have seen</h3>
//       {renderSeenIndexes()}
//       <h3>Calculated Values:</h3>
//       {renderValues()}
//     </div>
//   )
// }
