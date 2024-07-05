import{s as G,n as C}from"./scheduler.46lvm-Bv.js";import{S as O,i as j,g as k,s as d,J as M,h as r,A as f,c as _,j as R,K as N,f as a,k as F,a as t}from"./index.1X4n-btJ.js";function B(P){let p,S='If you’ve ever had to work with <a href="https://www.ros.org/" rel="nofollow">Robot Operating System 2</a> (ROS2) in python, you’ll know that getting it set up is the least of your issues. From using its own async model (rather than the standard <code>asyncio</code>) to relying entirely on callbacks, using it can be very painful for modern developers. That’s why I developed <code>aioros2</code>, which leverages <a href="https://docs.python.org/3/library/asyncio.html" rel="nofollow">asyncio</a> among other python features to wrap <a href="https://github.com/ros2/rclpy" rel="nofollow">rclpy</a> in an intuitive, pythonic manner. It takes heavy inspiration from <code>python-socketio</code> and provides the tools to reduce boilerplate by more than half. It’s still under development as part of my work at the CSC.',y,o,T='<a aria-hidden="true" tabindex="-1" href="#comparison"><span class="icon icon-link"></span></a>Comparison',m,e,x='The following is a simple <a href="https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html" rel="nofollow">action node and client</a> which computes the fibonacci sequence, written in <code>rclpy</code>',g,c,w,I=`<code class="language-python"><span class="token comment">############### Server.py ###############</span>
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
    main<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`,b,l,A="Now, here’s the same node written using <code>aioros2</code>:",h,u,v,E=`<code class="language-python"><span class="token comment">############### Server.py ###############</span>
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
    main<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`,q,i,H="Much clearer, right? By using <code>asyncio</code> with async generators, I’m was able to halve the lines of code and greatly increase readability.";return{c(){p=k("p"),p.innerHTML=S,y=d(),o=k("h2"),o.innerHTML=T,m=d(),e=k("p"),e.innerHTML=x,g=d(),c=k("pre"),w=new M(!1),b=d(),l=k("p"),l.innerHTML=A,h=d(),u=k("pre"),v=new M(!1),q=d(),i=k("p"),i.innerHTML=H,this.h()},l(n){p=r(n,"P",{"data-svelte-h":!0}),f(p)!=="svelte-1mt51zp"&&(p.innerHTML=S),y=_(n),o=r(n,"H2",{id:!0,"data-svelte-h":!0}),f(o)!=="svelte-1wu3w01"&&(o.innerHTML=T),m=_(n),e=r(n,"P",{"data-svelte-h":!0}),f(e)!=="svelte-y3wbg0"&&(e.innerHTML=x),g=_(n),c=r(n,"PRE",{class:!0});var s=R(c);w=N(s,!1),s.forEach(a),b=_(n),l=r(n,"P",{"data-svelte-h":!0}),f(l)!=="svelte-lt6v8m"&&(l.innerHTML=A),h=_(n),u=r(n,"PRE",{class:!0});var L=R(u);v=N(L,!1),L.forEach(a),q=_(n),i=r(n,"P",{"data-svelte-h":!0}),f(i)!=="svelte-1geqh6q"&&(i.innerHTML=H),this.h()},h(){F(o,"id","comparison"),w.a=null,F(c,"class","language-python"),v.a=null,F(u,"class","language-python")},m(n,s){t(n,p,s),t(n,y,s),t(n,o,s),t(n,m,s),t(n,e,s),t(n,g,s),t(n,c,s),w.m(I,c),t(n,b,s),t(n,l,s),t(n,h,s),t(n,u,s),v.m(E,u),t(n,q,s),t(n,i,s)},p:C,i:C,o:C,d(n){n&&(a(p),a(y),a(o),a(m),a(e),a(g),a(c),a(b),a(l),a(h),a(u),a(q),a(i))}}}const z={title:"aioros2",date:"2024-6-30",github:"https://github.com/California-Strawberry-Commission/laser-runner-cutter/tree/main/ros2/aioros2",categories:["python","ros2","software","csc"],cover:"/portfolio/assets/aioros2/pyhero.png",excerpt:"A Pythonic way to interact with ROS2"};class J extends O{constructor(p){super(),j(this,p,null,B,G,{})}}export{J as default,z as metadata};
