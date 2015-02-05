task :default => [:new_post]

desc "Create a new Post"
task :new_post do
  filename = "_posts/#{Time.now.strftime('%Y-%m-%d')}-1.md"
  if File.exist?(filename)
    abort("#{filename} exist")
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts 'title: "hi"'
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
    post.puts "categories: tech"
    post.puts "---"
  end
end
