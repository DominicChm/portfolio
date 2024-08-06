import{s as J,n as H}from"./scheduler.46lvm-Bv.js";import{S as K,i as z,g as o,s as l,J as E,h as e,A as y,c as u,j as G,K as j,f as a,k as L,a as t}from"./index.1X4n-btJ.js";function Q(B){let p,A='If you’ve ever had to work with <a href="https://www.ros.org/" rel="nofollow">Robot Operating System 2</a> (ROS2) in python, you’ll know that getting it set up is the least of your issues. From using its own async model (rather than the standard <code>asyncio</code>) to relying entirely on callbacks, using it can be very painful for modern developers. That’s why I developed <code>aioros2</code>, which leverages <a href="https://docs.python.org/3/library/asyncio.html" rel="nofollow">asyncio</a> among other python features to wrap <a href="https://github.com/ros2/rclpy" rel="nofollow">rclpy</a> in an intuitive, pythonic manner.',g,i,S="I took heavy inspiration from the decorator-centric API of <code>python-socketio</code> which allowed me to reduce boilerplate by more than half compared to native <code>rclpy</code>. Additionally, I added a dependency management system which enabled me to effectively automate the generation of client libraries which must be manually created and maintained in native <code>rclpy</code>.",w,k,M=`The result (in my opinion) is a massive improvement in developer ergonomics, project management, and integration speed when using <code>ROS2</code>.
<code>aioros2</code> still under heavy development and through documentation needs to be written, but feedback I’ve received from fellow developers is very positive.`,b,c,R='<a aria-hidden="true" tabindex="-1" href="#comparison"><span class="icon icon-link"></span></a>Comparison',h,r,P='The following is a simple <a href="https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html" rel="nofollow">action node and client</a> (derived from the <a href="https://github.com/ros2/examples/tree/rolling/rclpy/actions" rel="nofollow">official example</a>) which computes the fibonacci sequence, written in <code>rclpy</code>.',v,d,q,D=`<code class="language-python"><span class="token comment">############### Server.py ###############</span>
<span class="token keyword">import</span> time

<span class="token keyword">import</span> rclpy
<span class="token keyword">from</span> rclpy<span class="token punctuation">.</span>action <span class="token keyword">import</span> ActionServer
<span class="token keyword">from</span> rclpy<span class="token punctuation">.</span>node <span class="token keyword">import</span> Node

<span class="token keyword">from</span> action_tutorials_interfaces<span class="token punctuation">.</span>action <span class="token keyword">import</span> Fibonacci


<span class="token keyword">class</span> <span class="token class-name">FibonacciActionServer</span><span class="token punctuation">(</span>Node<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token string">'fibonacci_action_server'</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_action_server <span class="token operator">=</span> ActionServer<span class="token punctuation">(</span>
            self<span class="token punctuation">,</span>
            Fibonacci<span class="token punctuation">,</span>
            <span class="token string">'fibonacci'</span><span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>execute_callback<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">execute_callback</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> goal_handle<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Executing goal...'</span><span class="token punctuation">)</span>

        feedback_msg <span class="token operator">=</span> Fibonacci<span class="token punctuation">.</span>Feedback<span class="token punctuation">(</span><span class="token punctuation">)</span>
        feedback_msg<span class="token punctuation">.</span>partial_sequence <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> goal_handle<span class="token punctuation">.</span>request<span class="token punctuation">.</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
            feedback_msg<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">.</span>append<span class="token punctuation">(</span>
                feedback_msg<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> feedback_msg<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Feedback: &#123;0&#125;'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>feedback_msg<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">)</span><span class="token punctuation">)</span>
            goal_handle<span class="token punctuation">.</span>publish_feedback<span class="token punctuation">(</span>feedback_msg<span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

        goal_handle<span class="token punctuation">.</span>succeed<span class="token punctuation">(</span><span class="token punctuation">)</span>

        result <span class="token operator">=</span> Fibonacci<span class="token punctuation">.</span>Result<span class="token punctuation">(</span><span class="token punctuation">)</span>
        result<span class="token punctuation">.</span>sequence <span class="token operator">=</span> feedback_msg<span class="token punctuation">.</span>partial_sequence
        <span class="token keyword">return</span> result


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    rclpy<span class="token punctuation">.</span>init<span class="token punctuation">(</span>args<span class="token operator">=</span>args<span class="token punctuation">)</span>

    fibonacci_action_server <span class="token operator">=</span> FibonacciActionServer<span class="token punctuation">(</span><span class="token punctuation">)</span>

    rclpy<span class="token punctuation">.</span>spin<span class="token punctuation">(</span>fibonacci_action_server<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">############### Client.py ###############</span>
<span class="token keyword">import</span> rclpy
<span class="token keyword">from</span> rclpy<span class="token punctuation">.</span>action <span class="token keyword">import</span> ActionClient
<span class="token keyword">from</span> rclpy<span class="token punctuation">.</span>node <span class="token keyword">import</span> Node

<span class="token keyword">from</span> action_tutorials_interfaces<span class="token punctuation">.</span>action <span class="token keyword">import</span> Fibonacci


<span class="token keyword">class</span> <span class="token class-name">FibonacciActionClient</span><span class="token punctuation">(</span>Node<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token string">'fibonacci_action_client'</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_action_client <span class="token operator">=</span> ActionClient<span class="token punctuation">(</span>self<span class="token punctuation">,</span> Fibonacci<span class="token punctuation">,</span> <span class="token string">'fibonacci'</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">send_goal</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> order<span class="token punctuation">)</span><span class="token punctuation">:</span>
        goal_msg <span class="token operator">=</span> Fibonacci<span class="token punctuation">.</span>Goal<span class="token punctuation">(</span><span class="token punctuation">)</span>
        goal_msg<span class="token punctuation">.</span>order <span class="token operator">=</span> order

        self<span class="token punctuation">.</span>_action_client<span class="token punctuation">.</span>wait_for_server<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>_send_goal_future <span class="token operator">=</span> self<span class="token punctuation">.</span>_action_client<span class="token punctuation">.</span>send_goal_async<span class="token punctuation">(</span>goal_msg<span class="token punctuation">,</span> feedback_callback<span class="token operator">=</span>self<span class="token punctuation">.</span>feedback_callback<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>_send_goal_future<span class="token punctuation">.</span>add_done_callback<span class="token punctuation">(</span>self<span class="token punctuation">.</span>goal_response_callback<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">goal_response_callback</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> future<span class="token punctuation">)</span><span class="token punctuation">:</span>
        goal_handle <span class="token operator">=</span> future<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> goal_handle<span class="token punctuation">.</span>accepted<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Goal rejected :('</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>

        self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Goal accepted :)'</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>_get_result_future <span class="token operator">=</span> goal_handle<span class="token punctuation">.</span>get_result_async<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_get_result_future<span class="token punctuation">.</span>add_done_callback<span class="token punctuation">(</span>self<span class="token punctuation">.</span>get_result_callback<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">get_result_callback</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> future<span class="token punctuation">)</span><span class="token punctuation">:</span>
        result <span class="token operator">=</span> future<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>result
        self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Result: &#123;0&#125;'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>sequence<span class="token punctuation">)</span><span class="token punctuation">)</span>
        rclpy<span class="token punctuation">.</span>shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">feedback_callback</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> feedback_msg<span class="token punctuation">)</span><span class="token punctuation">:</span>
        feedback <span class="token operator">=</span> feedback_msg<span class="token punctuation">.</span>feedback
        self<span class="token punctuation">.</span>get_logger<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'Received feedback: &#123;0&#125;'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>feedback<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    rclpy<span class="token punctuation">.</span>init<span class="token punctuation">(</span>args<span class="token operator">=</span>args<span class="token punctuation">)</span>

    action_client <span class="token operator">=</span> FibonacciActionClient<span class="token punctuation">(</span><span class="token punctuation">)</span>

    action_client<span class="token punctuation">.</span>send_goal<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>

    rclpy<span class="token punctuation">.</span>spin<span class="token punctuation">(</span>action_client<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`,C,f,I="Now, here’s the same node written using <code>aioros2</code>:",F,_,T,U=`<code class="language-python"><span class="token comment">############### Server.py ###############</span>
<span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> action_tutorials_interfaces<span class="token punctuation">.</span>action <span class="token keyword">import</span> Fibonacci
<span class="token keyword">from</span> aioros2 <span class="token keyword">import</span> node<span class="token punctuation">,</span> action<span class="token punctuation">,</span> serve_nodes<span class="token punctuation">,</span> result<span class="token punctuation">,</span> feedback

<span class="token decorator annotation punctuation">@node</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Fibonacci</span><span class="token punctuation">:</span>

    <span class="token decorator annotation punctuation">@action</span><span class="token punctuation">(</span><span class="token string">"~/fibonacci"</span><span class="token punctuation">,</span> Fibonacci<span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">action_fib</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> order<span class="token punctuation">)</span><span class="token punctuation">:</span>
        sequence <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
            sequence<span class="token punctuation">.</span>append<span class="token punctuation">(</span>sequence<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> sequence<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">yield</span> feedback<span class="token punctuation">(</span>partial_sequence<span class="token operator">=</span>sequence<span class="token punctuation">)</span>
            <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

        <span class="token comment"># Last yield is result</span>
        <span class="token keyword">yield</span> result<span class="token punctuation">(</span>sequence<span class="token operator">=</span>sequence<span class="token punctuation">)</span>
        

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    serve_nodes<span class="token punctuation">(</span>Fibonacci<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">############### Client.py ###############</span>
<span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> <span class="token punctuation">.</span>server <span class="token keyword">import</span> Fibonacci
<span class="token keyword">from</span> aioros2 <span class="token keyword">import</span> ClientDriver

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    n <span class="token operator">=</span> ClientDriver<span class="token punctuation">(</span>Fibonacci<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Calling action!"</span><span class="token punctuation">)</span>
    action <span class="token operator">=</span> n<span class="token punctuation">.</span>action_fib<span class="token punctuation">(</span>order<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">for</span> feedback <span class="token keyword">in</span> action<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Got partial sequence:"</span><span class="token punctuation">,</span> feedback<span class="token punctuation">.</span>partial_sequence<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Got result: "</span><span class="token punctuation">,</span> action<span class="token punctuation">.</span>result<span class="token punctuation">.</span>sequence<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>_main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`,x,m,N="By using <code>asyncio</code> with async generators, <code>aioros2</code> is able to halve lines of code and greatly increase readability.";return{c(){p=o("p"),p.innerHTML=A,g=l(),i=o("p"),i.innerHTML=S,w=l(),k=o("p"),k.innerHTML=M,b=l(),c=o("h2"),c.innerHTML=R,h=l(),r=o("p"),r.innerHTML=P,v=l(),d=o("pre"),q=new E(!1),C=l(),f=o("p"),f.innerHTML=I,F=l(),_=o("pre"),T=new E(!1),x=l(),m=o("p"),m.innerHTML=N,this.h()},l(n){p=e(n,"P",{"data-svelte-h":!0}),y(p)!=="svelte-1loir4t"&&(p.innerHTML=A),g=u(n),i=e(n,"P",{"data-svelte-h":!0}),y(i)!=="svelte-14731t"&&(i.innerHTML=S),w=u(n),k=e(n,"P",{"data-svelte-h":!0}),y(k)!=="svelte-1ai3b0w"&&(k.innerHTML=M),b=u(n),c=e(n,"H2",{id:!0,"data-svelte-h":!0}),y(c)!=="svelte-1wu3w01"&&(c.innerHTML=R),h=u(n),r=e(n,"P",{"data-svelte-h":!0}),y(r)!=="svelte-5kqxv1"&&(r.innerHTML=P),v=u(n),d=e(n,"PRE",{class:!0});var s=G(d);q=j(s,!1),s.forEach(a),C=u(n),f=e(n,"P",{"data-svelte-h":!0}),y(f)!=="svelte-lt6v8m"&&(f.innerHTML=I),F=u(n),_=e(n,"PRE",{class:!0});var O=G(_);T=j(O,!1),O.forEach(a),x=u(n),m=e(n,"P",{"data-svelte-h":!0}),y(m)!=="svelte-umuorv"&&(m.innerHTML=N),this.h()},h(){L(c,"id","comparison"),q.a=null,L(d,"class","language-python"),T.a=null,L(_,"class","language-python")},m(n,s){t(n,p,s),t(n,g,s),t(n,i,s),t(n,w,s),t(n,k,s),t(n,b,s),t(n,c,s),t(n,h,s),t(n,r,s),t(n,v,s),t(n,d,s),q.m(D,d),t(n,C,s),t(n,f,s),t(n,F,s),t(n,_,s),T.m(U,_),t(n,x,s),t(n,m,s)},p:H,i:H,o:H,d(n){n&&(a(p),a(g),a(i),a(w),a(k),a(b),a(c),a(h),a(r),a(v),a(d),a(C),a(f),a(F),a(_),a(x),a(m))}}}const X={title:"aioros2",date:"2024-6-30",github:"https://github.com/California-Strawberry-Commission/laser-runner-cutter/tree/main/ros2/aioros2",categories:["python","ros2","software","csc","highlight"],cover:"/portfolio/assets/aioros2/pyhero.png",excerpt:"A Pythonic way to interact with ROS2"};class Y extends K{constructor(p){super(),z(this,p,null,Q,J,{})}}export{Y as default,X as metadata};
