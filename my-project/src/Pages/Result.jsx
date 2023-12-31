import { onAuthStateChanged } from '@firebase/auth';
import { set, ref } from '@firebase/database';
import React, { useEffect, useState } from 'react';
import { app, db, auth } from '../Components/FirebaseAuth';
import Navbar from '../Components/Navbar';
import ResultLoading from '../Components/ResultLoading';

const Result = () => {

  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);

  const [username, setUsername] = useState('');

  const careerRecommendations = [
    {
      career: localStorage.getItem('test1') ? JSON.parse(localStorage.getItem('test1'))[0] : "No data found",
      priority: 'High',
    },
    {
      career: localStorage.getItem('test2') ? JSON.parse(localStorage.getItem('test2'))[0] : "No data found",
      priority: 'Medium',
    },
    {
      career: localStorage.getItem('test3') ? JSON.parse(localStorage.getItem('test3'))[0] : "No data found",
      priority: 'Low',
    },
    // Add more career recommendations here...
  ];

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email.split("@")[0])
        console.log(username)
      }
      else {
        navigate("/")
      }
    })
    const writeData = async () => {
      await set(ref(db, "users/" + username + "/careerMappings"),
        {
          careerRecommendations
        }
      )
    }

    writeData()
  }, [username])




  return (
    <>
    {isLoading===false ? (
<>
      <Navbar />

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Career Recommendations</h1>
        <p className="text-lg mb-4">
          Based on your test results, we recommend the following careers:
        </p>

        <ul className="list-inside list-disc pl-4">
          {careerRecommendations.map((recommendation, index) => (
            <li
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {recommendation.career}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${recommendation.priority === 'High'
                      ? 'bg-red-500 text-white'
                      : recommendation.priority === 'Medium'
                        ? 'bg-yellow-500 text-gray-900'
                        : 'bg-green-500 text-white'
                    }`}
                >
                  {recommendation.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    
    </>
    ) :(<ResultLoading/>)}
    </> 
  );
  
};

export default Result;
