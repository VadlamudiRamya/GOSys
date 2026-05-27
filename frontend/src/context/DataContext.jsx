import React, { createContext, useState, useEffect, useCallback } from 'react';

export const DataContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gosys-backend.onrender.com/api';

export const DataProvider = ({ children }) => {
  const [years, setYears] = useState([]);
  const [alumni, setAlumni] = useState({});
  const [courses, setCourses] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }, []);

  const fetchYears = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/years`);
      const data = await response.json();
      setYears(data.map(year => ({ year, new: false })));
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  }, []);

  const fetchAlumniByYear = useCallback(async (year) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/${year}`);
      const data = await response.json();
      setAlumni(prev => ({ ...prev, [year]: data }));
    } catch (error) {
      console.error(`Error fetching alumni for ${year}:`, error);
    }
  }, []);

  const fetchAcademics = useCallback(async () => {
    try {
      const degreesResponse = await fetch(`${API_BASE_URL}/academics/degrees`);
      const degrees = await degreesResponse.json();
      
      const academicData = {};
      for (const degree of degrees) {
        const deptsResponse = await fetch(`${API_BASE_URL}/academics/${degree}/departments`);
        const departments = await deptsResponse.json();
        academicData[degree] = {};
        for (const dept of departments) {
          const coursesResponse = await fetch(`${API_BASE_URL}/academics/${degree}/${dept}/courses`);
          const coursesData = await coursesResponse.json();
          academicData[degree][dept] = coursesData;
        }
      }
      setCourses(academicData);
    } catch (error) {
      console.error('Error fetching academics:', error);
    }
  }, []);

  useEffect(() => {
    fetchYears();
    fetchAcademics();
  }, [fetchYears, fetchAcademics]);

  useEffect(() => {
    years.forEach(y => {
      if (!alumni[y.year]) {
        fetchAlumniByYear(y.year);
      }
    });
  }, [years, alumni, fetchAlumniByYear]);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  const addYear = async (year) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/year`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ year: parseInt(year) }),
      });
      if (response.ok) {
        setYears(prev => [...prev, { year: parseInt(year), new: true }]);
        if (!alumni[year]) {
          setAlumni(prev => ({ ...prev, [year]: [] }));
        }
      }
    } catch (error) {
      console.error('Error adding year:', error);
    }
  };

  const addAlumnus = async (year, alumnusData) => {
    try {
      const payload = {
        studentName: alumnusData.studentName,
        rollNumber: alumnusData.rollNumber,
        degree: alumnusData.degree,
        department: alumnusData.department,
        role: alumnusData.role,
        company: alumnusData.company,
        package: alumnusData.package,
      };
      const response = await fetch(`${API_BASE_URL}/alumni/${year}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        fetchAlumniByYear(year);
      }
    } catch (error) {
      console.error('Error adding alumnus:', error);
    }
  };

  const editAlumnus = async (year, updatedAlumnus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/${updatedAlumnus._id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedAlumnus),
      });
      if (response.ok) {
        fetchAlumniByYear(year);
      }
    } catch (error) {
      console.error('Error editing alumnus:', error);
    }
  };

  const deleteAlumnus = async (year, alumnusId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/${alumnusId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (response.ok) {
        fetchAlumniByYear(year);
      }
    } catch (error) {
      console.error('Error deleting alumnus:', error);
    }
  };

  const deleteYear = async (year) => {
    if (!window.confirm(`Are you sure you want to delete the year ${year} and all its records?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/alumni/year/${year}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (response.ok) {
        fetchYears();
      }
    } catch (error) {
      console.error('Error deleting year:', error);
    }
  };

  const addCourse = async (degree, department, course) => {
    try {
      const payload = {
        degreeProgram: degree,
        department,
        courseName: course.courseName,
        rating: course.rating,
      };
      const response = await fetch(`${API_BASE_URL}/academics/course`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  
  const editCourse = async (degree, department, updatedCourse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/academics/course/${updatedCourse._id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedCourse),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const deleteCourse = async (degree, department, courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/academics/course/${courseId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const addDegree = async (newDegree) => {
    try {
      const response = await fetch(`${API_BASE_URL}/academics/degree`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ degreeProgram: newDegree }),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error adding degree:', error);
    }
  };

  const deleteDegree = async (degree) => {
    if (!window.confirm(`Are you sure you want to delete the degree program "${degree}" and all its departments/courses?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/academics/degree/${degree}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error deleting degree:', error);
    }
  };

  const addDepartment = async (degree, newDepartment) => {
    try {
      const response = await fetch(`${API_BASE_URL}/academics/department`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ degreeProgram: degree, department: newDepartment }),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const deleteDepartment = async (degree, department) => {
    if (!window.confirm(`Are you sure you want to delete the department "${department}" under "${degree}"?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/academics/department/${degree}/${department}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (response.ok) {
        fetchAcademics();
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <DataContext.Provider value={{ 
      years, alumni, courses, 
      addYear, deleteYear, addAlumnus, editAlumnus, deleteAlumnus, 
      addCourse, editCourse, deleteCourse, 
      isLoggedIn, login, logout, 
      addDegree, deleteDegree, addDepartment, deleteDepartment 
    }}>
      {children}
    </DataContext.Provider>
  );
};

