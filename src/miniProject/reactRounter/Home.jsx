import React, { useEffect } from "react";
import Header from "./Header";
import BottomBar from "./BottomBar";
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Home() {

  const heroImage ="./doneTodo.svg"; // Use the correct path to your image

  const steps = [
    {
      title: "Think",
      image: "./think.svg",
    },
    {
      title: "Add",
      image: "./addNotes.svg",
    },
    {
      title: "Delete",
      image: "./delete.svg",
    },
    {
      title: "Completed",
      image: "./complete.svg",
    },
  ];


  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);



  return (
    <>
      <div className="bg-gradient-to-r from-indigo-100 via-white to-white">
        <Header />

        <div className="flex flex-col items-center justify-center  text-center  px-4 md:px-10" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight whitespace-pre-line">
            Conquer Your Day, One{"\n"}  Task at a Time
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
            Work smarter, not harder: Organize tasks, crush goals, and stay calm while getting things done
          </p>
          <a href="#" className="bg-indigo-500 text-white py-3 px-8 rounded-md text-lg md:text-xl font-semibold hover:bg-indigo-600 transition shadow-lg" data-aos="fade-up" data-aos-delay="400">
            Get Started
          </a>
          <div className="mt-8 md:mt-12" data-aos="fade-up" data-aos-delay="600">
            <img src="./meditaition.svg" alt="Meditation Illustration" className="w-80 md:w-100 lg:w-100 duration-300   hover:scale-105" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center  px-6  py-20  from-indigo-100 to-white">
          {/* Text Section */}
          <div className="text-center md:text-left max-w-3xl md:mr-10" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Easily Add,Swiftly Delete
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Manage your tasks with lightning speed and a touch of elegance.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:justify-end md:ml-10" data-aos="fade-left" data-aos-delay="100">
            <img
              src="./task.svg"
              alt="Task Illustration"
              className="w-72 md:w-96 lg:w-[28rem] transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center  px-6  py-20  from-indigo-100 to-white">
          {/* Text Section */}

          <div className="flex justify-center md:justify-end md:mr-10" data-aos="fade-right" data-aos-delay="100">
            <img
              src="./thinkTask.svg"
              alt="Task Illustration"
              className="w-72 md:w-96 lg:w-[28rem] transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="text-center md:text-left max-w-3xl md:ml-10" data-aos="fade-left" data-aos-delay="100">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Effortless Organization, Instant Management
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Experience seamless task handling with easy sorting, searching, and management. Keep your to-do list clear and productive
            </p>
          </div>

          {/* Image Section */}

        </div>


        <div className="flex flex-col md:flex-row items-center justify-center  px-6  py-20  from-indigo-100 to-white">
          {/* Text Section */}
          <div className="text-center md:text-left max-w-3xl md:mr-10" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Time, Priority, Deadlines: Your Tasks, Your Way
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Empower your productivity with customizable task timers, priority levels, deadlines, and intuitive note-making for optimal efficiency.            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:justify-end md:ml-10" data-aos="fade-left" data-aos-delay="100">
            <img
              src="./WorkInTime.svg"
              alt="Task Illustration"
              className="w-72 md:w-96 lg:w-[28rem] transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="py-6 text-center flex flex-col items-center gap-8" data-aos="fade-up">
          <p className="italic text-lg md:text-xl text-gray-700 max-w-4xl mb-10" data-aos="fade-up" data-aos-delay="100">
            “Navigate effortlessly through your tasks with clear steps, ensuring nothing falls through the cracks on your journey to achievement”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
            {steps.map((step, index) => (
              <div
                key={index}
                className="shadow-md rounded-2xl p-4 flex flex-col items-center transition hover:shadow-xl"
                data-aos="zoom-in"
                data-aos-delay={300 + index * 100} // stagger animation
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-48 object-contain mb-4"
                />
                <p className="italic font-medium text-lg">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 text-center " data-aos="fade-up" data-aos-delay="100">
          {/* Background sparkles and clouds (optional, use pattern bg or animated dots) */}
          <div className="absolute inset-0  opacity-20 pointer-events-none" />

          <div className="z-10 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold italic mb-4 text-gray-800">
              Its Just That Simple !
            </h2>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Master Your Day With Our <br /> TodoList
            </h1>

            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              "Organize tasks effortlessly, prioritize effectively, and conquer deadlines with our intuitive todo list for seamless productivity management."
            </p>

            <button className="bg-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
              Get Started
            </button>

            <div className="mt-12 flex justify-center">
              <img
                src={heroImage}
                alt="Unicorn girl"
                className="w-64 md:w-96 object-contain"
              />
            </div>
          </div>
        </section>


        <BottomBar />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

    </>
  );
}
