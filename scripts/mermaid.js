hexo.extend.injector.register('body_end', `
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad: true, theme: "dark"});</script>
`, 'default');

hexo.extend.filter.register('after_render:html', function(str) {
  if (str.indexOf('mermaid') === -1) return str;
  return str.replace(/<pre><code class="highlight mermaid">([\s\S]*?)<\/code><\/pre>/g, '<pre class="mermaid">$1</pre>');
});
