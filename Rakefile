# coding: utf-8
require "rubygems"
require "bundler/setup"
require "stringex"

github_origin = 'git@github.com:mangege/mangege.github.com.git'
domain = 'mangege.com'

task :default => [:deploy]

desc 'deploy to github pages'
task :deploy do
  puts "deploy site"
  system 'rm -rf _site'
  system 'jekyll --redcarpet'
  cd '_site' do
    system "echo -n #{domain} > CNAME"
    system "git init"
    system "git add ."
    system "git commit -m 'site update #{Time.now}'"
    system "git remote add origin #{github_origin}"
    system "git push -f origin master"
  end
end

# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (defaults to "new-post")
desc "Create a new Post"
task :new_post, :title do |t, args|
  args.with_defaults(:title => 'new-post')
  title = args.title
  filename = "_source/_posts/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.md"
  if File.exist?(filename)
    abort("文章 #{filename} 已存在")
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "categories: "
    post.puts "---"
  end
  #system("vim #{filename}")
end

desc "Preview"
task :preview do
  system "jekyll --redcarpet --server --auto "
end
