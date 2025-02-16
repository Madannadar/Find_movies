import React, { useState } from 'react';

const ResourceAllocation = () => {
  // State to store input values
  const [resourceData, setResourceData] = useState({
    students: {
      numberOfStudents: "",
    },
    classrooms: {
      numberOfClassrooms: "",
      capacityOfClassroom: "",
    },
    labs: {
      numberOfLabs: "",
      capacityOfLabs: "",
    },
    faculty: {
      numberOfFaculty: "",
    },
  });

  // State to store calculated results
  const [requiredClassrooms, setRequiredClassrooms] = useState(0);
  const [requiredLabs, setRequiredLabs] = useState(0);
  const [requiredFaculty, setRequiredFaculty] = useState(0);

  // State to store messages for insufficient resources
  const [classroomMessage, setClassroomMessage] = useState('');
  const [labMessage, setLabMessage] = useState('');
  const [facultyMessage, setFacultyMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e, category, subCategory) => {
    const { value } = e.target;
    setResourceData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [subCategory]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure values from resourceData
    const {
      students: { numberOfStudents },
      classrooms: { numberOfClassrooms, capacityOfClassroom },
      labs: { numberOfLabs, capacityOfLabs },
      faculty: { numberOfFaculty },
    } = resourceData;

    // Convert string values to numbers
    const numStudents = parseInt(numberOfStudents);
    const numClassrooms = parseInt(numberOfClassrooms);
    const capClassroom = parseInt(capacityOfClassroom);
    const numLabs = parseInt(numberOfLabs);
    const capLabs = parseInt(capacityOfLabs);
    const numFaculty = parseInt(numberOfFaculty);

    // Calculate required classrooms (2/3 of students divided by classroom capacity)
    const studentsForClassrooms = (2 / 3) * numStudents;
    const classroomsNeeded = Math.ceil(studentsForClassrooms / capClassroom);

    // Calculate required labs (1/3 of students divided by lab capacity)
    const studentsForLabs = (1 / 3) * numStudents;
    const labsNeeded = Math.ceil(studentsForLabs / capLabs);

    // Calculate required faculty (15 students per faculty)
    const facultyNeeded = Math.ceil(numStudents / 15);

    // Update state with calculated values
    setRequiredClassrooms(classroomsNeeded);
    setRequiredLabs(labsNeeded);
    setRequiredFaculty(facultyNeeded);

    // Check if available resources are sufficient and set messages
    if (numClassrooms < classroomsNeeded) {
      setClassroomMessage(`Insufficient classrooms! You need ${classroomsNeeded - numClassrooms} more classrooms.`);
    } else {
      setClassroomMessage('Classrooms are sufficient.');
    }

    if (numLabs < labsNeeded) {
      setLabMessage(`Insufficient labs! You need ${labsNeeded - numLabs} more labs.`);
    } else {
      setLabMessage('Labs are sufficient.');
    }

    if (numFaculty < facultyNeeded) {
      setFacultyMessage(`Insufficient faculty! You need ${facultyNeeded - numFaculty} more faculty members.`);
    } else {
      setFacultyMessage('Faculty is sufficient.');
    }

    // Log results to the console
    console.log({
      numberOfStudents: numStudents,
      numberOfClassrooms: numClassrooms,
      capacityOfClassroom: capClassroom,
      numberOfLabs: numLabs,
      capacityOfLabs: capLabs,
      numberOfFaculty: numFaculty,
      requiredClassrooms: classroomsNeeded,
      requiredLabs: labsNeeded,
      requiredFaculty: facultyNeeded,
    });
  };

  // Function to fill form with sample data
  const useSampleData = () => {
    setResourceData({
      students: {
        numberOfStudents: "300",
      },
      classrooms: {
        numberOfClassrooms: "5",
        capacityOfClassroom: "30",
      },
      labs: {
        numberOfLabs: "2",
        capacityOfLabs: "40",
      },
      faculty: {
        numberOfFaculty: "10",
      },
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Resource Allocation Calculator
      </h1>

      <div className="w-full flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-white border-t">
          <div className="mb-4 text-right">
            <button
              onClick={useSampleData}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Use Sample Data
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Fields */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Input Values</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Students:
                  </label>
                  <input
                    type="number"
                    value={resourceData.students.numberOfStudents}
                    onChange={(e) => handleInputChange(e, "students", "numberOfStudents")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Classrooms:
                  </label>
                  <input
                    type="number"
                    value={resourceData.classrooms.numberOfClassrooms}
                    onChange={(e) => handleInputChange(e, "classrooms", "numberOfClassrooms")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity of Each Classroom:
                  </label>
                  <input
                    type="number"
                    value={resourceData.classrooms.capacityOfClassroom}
                    onChange={(e) => handleInputChange(e, "classrooms", "capacityOfClassroom")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Labs:
                  </label>
                  <input
                    type="number"
                    value={resourceData.labs.numberOfLabs}
                    onChange={(e) => handleInputChange(e, "labs", "numberOfLabs")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity of Each Lab:
                  </label>
                  <input
                    type="number"
                    value={resourceData.labs.capacityOfLabs}
                    onChange={(e) => handleInputChange(e, "labs", "capacityOfLabs")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Faculty:
                  </label>
                  <input
                    type="number"
                    value={resourceData.faculty.numberOfFaculty}
                    onChange={(e) => handleInputChange(e, "faculty", "numberOfFaculty")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: "var(--primary-color)" }} // Apply primary color to input text
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Requirements
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Results</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Calculated Requirements:</h3>
              <p>Required Classrooms: {requiredClassrooms}</p>
              <p>Required Labs: {requiredLabs}</p>
              <p>Required Faculty: {requiredFaculty}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Resource Status:</h3>
              <p>{classroomMessage}</p>
              <p>{labMessage}</p>
              <p>{facultyMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Define --primary-color in a global style tag */}
      <style>
        {`
          :root {
            --primary-color: #2563eb; /* Blue color as primary */
          }
        `}
      </style>
    </div>
  );
};

export default ResourceAllocation;