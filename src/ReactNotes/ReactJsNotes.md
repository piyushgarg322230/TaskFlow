
Components Template--
      1. https://ui.aceternity.com/components/navbar-menu
      
Cuurency API Provide :
      1. https://currencyfreaks.com/#HistoricalRatesConversion






React Js ----

   --React js in Variable are used in html code is call by "Evaluation Expression" .
   -- React js is a Javascript Libary 
   --Complex Fornted implemention 


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

React Lifecyle ----
      --Each component in React has a lifecycle which you can monitor and manipulate during its three main phases.
            The three phases are: Mounting, Updating, and Unmounting.
      --Mounting :
            Mounting means putting elements into the DOM.
            React has four built-in methods that gets called, in this order, when mounting a component:
            1. constructor()
            2.getDerivedStateFromProps()
            3.render()
            4.componentDidMount()
      --Unmounting :
            The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
            React has only one built-in method that gets called when a component is unmounted:
            1.componentWillUnmount()
      --Updating :
            The next phase in the lifecycle is when a component is updated.
            A component is updated whenever there is a change in the component's state or props.
            React has five built-in methods that gets called, in this order, when a component is updated:
            1. getDerivedStateFromProps()          
            2. shouldComponentUpdate()       
            3. render()      
            4. getSnapshotBeforeUpdate()        
            5. componentDidUpdate()

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

React Hooks -- 
    --web Application of use in UI Update 
    --Hooks are special function, that allow to use state and React Features in function components.
    1) UseState
    2) UseEffect: UseEffect is used to Perform side Effect in our Components. {Side Effect are Action is performed with the "OutSide World". We    Need id : Fetching Data form API, Updating the DOM Document and Window, Timer Function is SetTimeOut and SetInterval}
    3) UseContext: Three Simple Steps in context:-
            A. Providing The Context
            B. Consuming The Context 
            C. Creating The Context
    4)UseRef: UseRef is allow us to create Mutable Variable which do not cause re-render; 
            -- It is very usefull to direct access of DOM Element .
            -- Ex: {let countRef=useRef(0);}
    5)UseReducer: UseReducer is used manage state in our react Application .
            -- In Other World , UseReducer words like a state management tool.
            -- State Management: is Used to mannage all state of application in a simple Way
            -- Always use the reducer hooks, When you have handle state and method .
    6)UseLayoutEffect: useLayoutEffect works exactly same as useEffect.(Also the Same Syntax).
            -- But the difference is "when it's run'
            --UseEffect runs After the DOM is Printed on the Browser.
            --useLayoutEffect runs Before the DOM is Printed on the Browser.
    7)UseMemo: Prevent Unnecessary Re-renders: If ChildB receives a function as a prop, wrap the function with useCallback():
    8)UseCallback: UseCallback is a Hook that lets you cache a function definition between renders. that is using optimizied  performance beetween re-render child componement .  
    9)CustomHooks:
    


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

   Virtual DOM --
      --ReactDOM.createRoot(document.getElementById("Root"));
      --The virtual DOM is a lightweight representation of the actual DOM. It is a JavaScript object that React uses to manage and optimize updates to the real DOM.
      --Initial Render:
            -When a React component is first rendered, React creates a virtual DOM tree that mirrors the structure of the actual DOM.
      --Updates:
            -When the state or props of a component change, React creates a new virtual DOM tree that reflects these changes.
            -React then compares the new virtual DOM tree with the previous version using a process called "reconciliation."
      --Diffing Algorithm:
            -The reconciliation process uses a diffing algorithm to identify what has changed in the virtual DOM.
            -This algorithm quickly determines the minimal set of changes that need to be applied to the actual DOM.
      --Batch Updates:
            -React batches these changes and applies them in a single update to the actual DOM, which improves performance by reducing the number of direct manipulations.



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

React Router : 
      -- Link: Using inplation of a tag 
      -- NaLink







--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Tailwind Css :
      


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

