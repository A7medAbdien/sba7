## camera

            camera={{
                fov: 40,
                near: 0.1,
                far: 100,
                position: [0, 20, 5]
                // position: [0, 0, 2]
            }}
            
            
## que

I am trying to do such a scroll affect

what remain is to get the scrolling direction

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
                <Experience/>
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