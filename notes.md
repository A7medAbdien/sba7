## camera

            camera={{
                fov: 40,
                near: 0.1,
                far: 100,
                position: [0, 20, 5]
                // position: [0, 0, 2]
            }}
            
            
## que

I am wondering how to do such a scroll affect

it seems to be an infinite scrolling and without scrollbar

I was able to hide the scrollbar and do the scrolling, but it is not infinite and I can not know the direction of the scrolling

App.jsx

```js
    useEffect(() => {
        const handleClick = event => {

            element.removeEventListener('scroll', handleClick);

            // move boxes
            
            setTimeout(() => {
                element.addEventListener('scroll', handleClick);
            }, 1500);
        };

        const element = scrollRef.current;

        element.addEventListener('scroll', handleClick);
    }, [])
    
    return <>
        <Canvas>
            {/* Boxes */}
        </Canvas>
        <div className="container">
            <div
                ref={scrollRef}
                className="scroll">
                <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
            </div>
        </div>
    </>
```

style.css

```css
html,
body,
#root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
}

.scroll {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    top: 0;
    left: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
}


.container {
    height: 200px;
    width: 350px;
    background-color: #3c3c3c;
    overflow-y: auto;

    /* hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
    display: none;
}

/* hide scrollbar for chrome, safari and opera */
.container::-webkit-scrollbar {
    display: none;
}
```