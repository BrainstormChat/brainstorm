$bootstrap = <<SCRIPT

    if [ -f "/var/vagrant_provision" ]; then
    	exit 0
    fi

    _hostname='frontend'
    echo $_hostname &> /etc/hostname

    echo "# Starting custon features"
    echo "#"
    echo "# Updating system (This may take a few minutes...)"
    apt-get update &> /dev/null

    echo "# Instaling http server"
    apt-get install -y lighttpd npm git &> /dev/null

    echo "# Instaling Grunt"
    npm install grunt-cli -g &> /dev/null

    echo "# Instaling SASS"
    gem install sass &> /dev/null

    echo "# Targeting http server for your work directory"
    rm -rf /var/www &> /dev/null
    ln -s /vagrant /var/www

    echo "#"
    echo "# Front End development machine configured successfully"
    echo "# Please access localhost:8000 on browser for see your work"
    echo "#"
    echo "# See you space cowboy"

    touch /var/vagrant_provision

SCRIPT

Vagrant::Config.run do |config|
  config.vm.box = "Ubuntu_Trusty_Tahr:i386"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box"

  config.vm.provision :shell, inline: $bootstrap
  config.vm.provision :file, source: "~/.ssh/id_rsa", destination: "~/.ssh/id_rsa"

  config.vm.forward_port 80, 8000
end

# Vagrantfiles:
# https://github.com/guilhermemar/vagrantfiles/
